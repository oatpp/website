---
title: Coroutines
description: Oatpp coroutines. 
sidebarDepth: 0
---

# Oatpp Coroutines <seo/>

Oatpp coroutines are not regular coroutines.  
Oatpp implements custom stateless coroutines with scheduling. 
Scheduling gives additional space for optimization and better CPU utilization.

Oatpp-coroutines are executed via [oatpp::async::Executor](/api/latest/oatpp/core/async/Executor/). On each iteration coroutine
returns [oatpp::async::Action](/api/latest/oatpp/core/async/Coroutine/#action) which tells executor what to do next.
Based on the `Action` coroutine may be rescheduled to corresponding worker.

## Async Executor

[oatpp::async::Executor](/api/latest/oatpp/core/async/Executor/) allocates three groups of workers with specified number threads
for each group.

```cpp
oatpp::async::Executor executor(
    1 /* processor threads */, 
    1 /* I/O threads */, 
    1 /* timer threads */
);
```

All coroutines initially are placed to "processor" worker-group and may be rescheduled to I/O or Timer workers - 
depending on the [oatpp::async::Action](/api/latest/oatpp/core/async/Coroutine/#action) returned in Coroutine iteration.

<img src="https://raw.githubusercontent.com/lganzzzo/oatpp-website-res/master/diagram/oatpp_async_executor.svg?sanitize=true" width="700px">

::: tip
Despite the fact that coroutines may be rescheduled to different threads - coroutine is guaranteed to be destroyed on the same thread as it was created.
:::

### I/O Worker

For I/O `oatpp::async::Executor` uses [IOEventWorker](/api/latest/oatpp/core/async/worker/IOEventWorker/) 
with event-based I/O implementations:

- kqueue based implementation - for Mac/BSD systems.
- epoll based implementation - for Linux systems.

When coroutine returns Action of type [TYPE_IO_WAIT](/api/latest/oatpp/core/async/Coroutine/#action-type-io-wait), 
it gets rescheduled to I/O worker placing file-descriptor provided in Action to kqueue/epoll.  
**Thus oatpp-coroutines are not wasting CPU resources spinning and polling long-waiting connections.**


## API

In oatpp, Coroutine is the class extended from [oatpp::async::Coroutine](/api/latest/oatpp/core/async/Coroutine/#coroutine) or from 
[oatpp::async::CoroutineWithResult](/api/latest/oatpp/core/async/Coroutine/#coroutinewithresult).  
Coroutines are processed in the [oatpp::async::Executor](/api/latest/oatpp/core/async/Executor/).

```cpp
class MyCoroutine : public oatpp::async::Coroutine<MyCoroutine> {
public:

  /*
   *  act() - entrypoint of Coroutine
   *  returns Action - what to do next
   */
  Action act() override {
    OATPP_LOGD("MyCoroutine", "act()");
    return yieldTo(&MyCoroutine::step2);
  }

  Action step2() {
    OATPP_LOGD("MyCoroutine", "step2");
    return yieldTo(&MyCoroutine::step3);
  }

  Action step3() {
    OATPP_LOGD("MyCoroutine", "step3");
    return finish();
  }

};

oatpp::async::Executor executor();

executor.execute<MyCoroutine>();

executor.waitTasksFinished();
executor.stop();
executor.join();
```

Output:
```
MyCoroutine:act()
MyCoroutine:step2
MyCoroutine:step3
```

## Call Coroutine from Coroutine

```cpp
class OtherCoroutine : public oatpp::async::Coroutine<OtherCoroutine> {
public:
  Action act() override {
    OATPP_LOGD("OtherCoroutine", "act()");
    return finish();
  }
};

class MyCoroutine : public oatpp::async::Coroutine<MyCoroutine> {
public:

  Action act() override {
    OATPP_LOGD("MyCoroutine", "act()");
    return OtherCoroutine::start().next(finish()); /* Action to do after OtherCoroutine finished */);
  }

};

oatpp::async::Executor executor();

executor.execute<MyCoroutine>();

executor.waitTasksFinished();
executor.stop();
executor.join();
```

Output:
```
MyCoroutine:act()
OtherCoroutine:act()
```

## Call Coroutine and return Result

```cpp
class CoroutineWithResult : public oatpp::async::CoroutineWithResult<CoroutineWithResult, const char* /* result type */> {
public:
  Action act() override {
    OATPP_LOGD("CoroutineWithResult", "act()");
    return _return("<result>");
  }
};

class MyCoroutine : public oatpp::async::Coroutine<MyCoroutine> {
public:

  Action act() override {
    OATPP_LOGD("MyCoroutine", "act()");
    return CoroutineWithResult::startForResult().callbackTo(&MyCoroutine::onResult);
  }

  Action onResult(const char* result) {
    OATPP_LOGD("MyCoroutine", "result='%s'", result);
    return finish();
  }

};

oatpp::async::Executor executor();

executor.execute<MyCoroutine>();

executor.waitTasksFinished();
executor.stop();
executor.join();
```

Output:

```
MyCoroutine:act()
CoroutineWithResult:act()
MyCoroutine:result='<result>'
```

## Counter

```cpp
class MyCoroutineCounter : public oatpp::async::Coroutine<MyCoroutineCounter> {
private:
  const char* m_name;
  v_int32 m_counter = 0;
public:

  MyCoroutineCounter(const char* name) : m_name(name) {}

  Action act() override {
    OATPP_LOGD(m_name, "counter=%d", m_counter);
    if(m_counter < 10) {
      m_counter ++;
      return repeat();
    }
    return finish();
  }

};

oatpp::async::Executor executor();

executor.execute<MyCoroutineCounter>("A");
executor.execute<MyCoroutineCounter>("B");
executor.execute<MyCoroutineCounter>("C");

executor.waitTasksFinished();
executor.stop();
executor.join();
```

Possible Output:

```
A:counter=0
B:counter=0
C:counter=0
A:counter=1
B:counter=1
C:counter=1
A:counter=2
B:counter=2
C:counter=2
A:counter=3
B:counter=3
C:counter=3
A:counter=4
B:counter=4
C:counter=4
A:counter=5
B:counter=5
C:counter=5
A:counter=6
B:counter=6
C:counter=6
A:counter=7
B:counter=7
C:counter=7
A:counter=8
B:counter=8
C:counter=8
A:counter=9
B:counter=9
C:counter=9
A:counter=10
B:counter=10
C:counter=10
```