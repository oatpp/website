//
//  main.cpp
//  web-starter-project
//
//  Created by Leonid on 2/12/18.
//  Copyright © 2018 oatpp. All rights reserved.
//

#include "./controller/StaticController.hpp"
#include "./AppComponent.hpp"

#include "oatpp-libressl/Callbacks.hpp"

#include "oatpp/network/Server.hpp"

#include <iostream>
#include <csignal>

void run() {
  
  /* ignore SIGPIPE */
  std::signal(SIGPIPE, SIG_IGN);
  
  /* set default callbacks for libressl */
  oatpp::libressl::Callbacks::setDefaultCallbacks();
  
  AppComponent components; // Create scope Environment components
  
  /* create ApiControllers and add endpoints to router */
  
  auto router = components.httpRouter.getObject();
  
  auto staticController = StaticController::createShared();
  staticController->addEndpointsToRouter(router);
  
  /* create server */
  
  std::thread thread1([&components] {
    oatpp::network::Server server(components.serverConnectionProvider.getObject(),
                                  components.serverConnectionHandler.getObject());
    
    OATPP_LOGD("Server", "http-server on port %s...", components.serverConnectionProvider.getObject()->getProperty("port").toString()->c_str());
    server.run();
  });
  
  std::thread thread2([&components] {
    oatpp::network::Server server(components.serverSecureConnectionProvider.getObject(),
                                  components.serverSecureConnectionHandler.getObject());
    
    OATPP_LOGD("Server", "https-server on port %s...", components.serverSecureConnectionProvider.getObject()->getProperty("port").toString()->c_str());
    server.run();
  });
  
  thread1.join();
  thread2.join();
  
}

/**
 *  main
 */
int main(int argc, const char * argv[]) {

  oatpp::base::DefaultLogger::Config loggerConfig("%Y-%m-%d %H:%M:%S", false, 0xFFFFFFFF);
  oatpp::base::Environment::init(std::make_shared<oatpp::base::DefaultLogger>(loggerConfig));

  run();
  
  /* Print how much objects were created during app running, and what have left-probably leaked */
  /* Disable object counting for release builds using '-D OATPP_DISABLE_ENV_OBJECT_COUNTERS' flag for better performance */
  std::cout << "\nEnvironment:\n";
  std::cout << "objectsCount = " << oatpp::base::Environment::getObjectsCount() << "\n";
  std::cout << "objectsCreated = " << oatpp::base::Environment::getObjectsCreated() << "\n\n";
  
  oatpp::base::Environment::destroy();
  
  return 0;
}
