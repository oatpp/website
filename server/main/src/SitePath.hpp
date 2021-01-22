//
//  SitePath.hpp
//  Site
//
//  Created by Leonid on 5/2/18.
//  Copyright © 2018 oatpp. All rights reserved.
//

#ifndef SitePath_hpp
#define SitePath_hpp

#include "oatpp/web/server/interceptor/RequestInterceptor.hpp"
#include "oatpp/web/protocol/http/outgoing/BufferBody.hpp"

class SitePath {
public:
#if !defined(OATPP_TARGET_APP)
  constexpr static const char* SiteHost = "localhost:8443";
  constexpr static const char* CanonicalBase = "https://localhost:8443";
  constexpr static bool doRedirect = true;
#else
  constexpr static const char* SiteHost = "oatpp.io";
  constexpr static const char* CanonicalBase = "https://oatpp.io";
  constexpr static bool doRedirect = true;
#endif
  
public:
  
  class RedirectInterceptor : public oatpp::web::server::interceptor::RequestInterceptor {
  public:

    std::shared_ptr<OutgoingResponse> intercept(const std::shared_ptr<IncomingRequest>& request) override {
      if(doRedirect) {
        auto host = request->getHeader(oatpp::web::protocol::http::Header::HOST);
        if(!host || !host->equals(SiteHost)) {
          //OATPP_LOGD("Interceptor", "do redirect from https to https");
          auto response = OutgoingResponse::createShared(oatpp::web::protocol::http::Status::CODE_301, nullptr);
          response->putHeader("Location", CanonicalBase + request->getStartingLine().path.toString());
          return response;
        }
      }
      return nullptr;
    }
  };
  
  class RedirectToSecureInterceptor : public oatpp::web::server::interceptor::RequestInterceptor {
  public:
    std::shared_ptr<OutgoingResponse> intercept(const std::shared_ptr<IncomingRequest>& request) override {
      if(doRedirect) {
        //OATPP_LOGD("Interceptor", "do redirect from http to https");
        auto response = OutgoingResponse::createShared(oatpp::web::protocol::http::Status::CODE_301, nullptr);
        response->putHeader("Location", CanonicalBase + request->getStartingLine().path.toString());
        return response;
      }
      return nullptr;
    }
  };
  
};

#endif /* SitePath_hpp */
