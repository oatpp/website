//
//  StaticController.hpp
//  web-starter-project
//
//  Created by Leonid on 2/12/18.
//  Copyright © 2018 oatpp. All rights reserved.
//

#ifndef StaticController_hpp
#define StaticController_hpp

#include "SitePath.hpp"
#include "FilesIndex.hpp"
#include "StaticFileManager.hpp"

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/macro/component.hpp"

#include <unordered_map>

/**
 *  EXAMPLE ApiController
 *  Basic examples of howto create ENDPOINTs
 *  More details on oatpp.io
 */
class StaticController : public oatpp::web::server::api::ApiController {
public:
  typedef StaticController __ControllerType;
protected:
  StaticController(const std::shared_ptr<ObjectMapper>& objectMapper)
    : oatpp::web::server::api::ApiController(objectMapper)
  {}
public:
  OATPP_COMPONENT(std::shared_ptr<FilesIndex>, filesIndex);
  OATPP_COMPONENT(std::shared_ptr<StaticFileManager>, staticFileManager);
public:
  
  /**
   *  Inject @objectMapper component here as default parameter
   *  Do not return bare Controllable* object! use shared_ptr!
   */
  static std::shared_ptr<StaticController> createShared(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>,
                                                                      objectMapper)){
    return std::shared_ptr<StaticController>(new StaticController(objectMapper));
  }
  
  /**
   *  Begin ENDPOINTs generation ('ApiController' codegen)
   */
#include OATPP_CODEGEN_BEGIN(ApiController)

  ENDPOINT_ASYNC("GET", "/robots.txt", Robots) {

    ENDPOINT_ASYNC_INIT(Robots)

    Action act() override {
      const char* robots =
        "User-agent: *\n"
        "Disallow:\n"
        "\n"
        "# Sitemap files\n"
        "Sitemap: https://oatpp.io/sitemap/\n";
      auto response = controller->createResponse(Status::CODE_200, robots);
      response->putHeader(Header::CONTENT_TYPE, "text/plain; charset=utf-8");
      return _return(response);
    }

  };

  ENDPOINT_ASYNC("GET", "/sitemap", GetSitemap) {

    ENDPOINT_ASYNC_INIT(GetSitemap)

    Action act() override {
      auto response = controller->createResponse(Status::CODE_200, controller->filesIndex->getSitemap().getIndexFile());
      response->putHeader(Header::CONTENT_TYPE, "text/xml");
      return _return(response);
    }

  };

  ENDPOINT_ASYNC("GET", "/sitemap/{page}", GetSitemapUrls) {

    ENDPOINT_ASYNC_INIT(GetSitemapUrls)

    v_int32 verifyInt(const oatpp::String& value) const {
      bool success;
      auto pageIndexText = value;
      OATPP_ASSERT_HTTP(pageIndexText, Status::CODE_400, "Please specify correct page number");
      auto intValue = oatpp::utils::conversion::strToInt32(pageIndexText, success);
      OATPP_ASSERT_HTTP(success, Status::CODE_400, "Please specify correct page number");
      return intValue;
    }

    Action act() override {
      auto pageIndex = verifyInt(request->getPathVariable("page"));
      auto response = controller->createResponse(Status::CODE_200, controller->filesIndex->getSitemap().getUrlsFile(pageIndex));
      response->putHeader(Header::CONTENT_TYPE, "text/xml");
      return _return(response);
    }

  };

  ENDPOINT_ASYNC("GET", "/docs/start/step_by_step", StepByStep) {
    
    ENDPOINT_ASYNC_INIT(StepByStep)
    
    Action act() override {
      auto response = OutgoingResponse::createShared(oatpp::web::protocol::http::Status::CODE_301, nullptr);
      response->putHeader("Location", oatpp::String("") + SitePath::CanonicalBase + "/docs/start/step-by-step/");
      return _return(response);
    }
    
  };
  
  ENDPOINT_ASYNC("GET", "/docs/simple_vs_async", SimpleVsAsync) {
    
    ENDPOINT_ASYNC_INIT(SimpleVsAsync)
    
    Action act() override {
      auto response = OutgoingResponse::createShared(oatpp::web::protocol::http::Status::CODE_301, nullptr);
      response->putHeader("Location", oatpp::String("") + SitePath::CanonicalBase + "/docs/simple-vs-async/");
      return _return(response);
    }
    
  };

  ENDPOINT_ASYNC("GET", "/docs/integrations/swagger", IntegrationsSwagger) {

    ENDPOINT_ASYNC_INIT(IntegrationsSwagger)

    Action act() override {
      auto response = OutgoingResponse::createShared(oatpp::web::protocol::http::Status::CODE_301, nullptr);
      response->putHeader("Location", oatpp::String("") + SitePath::CanonicalBase + "/https://oatpp.io/docs/modules/oatpp-swagger/");
      return _return(response);
    }

  };
  
  ENDPOINT_ASYNC("GET", "*", Static) {
    
    ENDPOINT_ASYNC_INIT(Static)
    
    Action act() override {
      auto tail = request->getPathTail();
      OATPP_ASSERT_HTTP(tail, Status::CODE_400, "Empty filename");

      oatpp::parser::Caret caret(tail);

      auto pathLabel = caret.putLabel();
      caret.findChar('?');

      auto path = pathLabel.toString();

      auto queryLabel = caret.putLabel();
      caret.setPosition(tail->getSize());

      oatpp::parser::Caret pathCaret(path);

      /* redirect from non canonical urls */
      if(path->getSize() > 0 && path->getData()[path->getSize() - 1] != '/' && !pathCaret.findChar('.')) {
        auto response = OutgoingResponse::createShared(oatpp::web::protocol::http::Status::CODE_301, nullptr);
        oatpp::data::stream::ChunkedBuffer stream;
        stream.writeSimple(SitePath::CanonicalBase);
        stream.writeSimple("/", 1);
        stream.writeSimple(path);
        stream.writeSimple("/", 1);
        stream.writeSimple(queryLabel.toString());
        response->putHeader("Location", stream.toString());
        return _return(response);
      }

      auto info = controller->filesIndex->getFileInfo(path);
      if(!info) {
        info = controller->filesIndex->getFileInfo(path + "/");
      }
      OATPP_ASSERT_HTTP(info, Status::CODE_404, "Page not found");

      auto buffer = controller->staticFileManager->getFile(info->path, true);
      OATPP_ASSERT_HTTP(buffer, Status::CODE_500, "Can't read file");

      return _return(controller->createResponse(Status::CODE_200, buffer));
    }
    
  };
  
  /**
   *  Finish ENDPOINTs generation ('ApiController' codegen)
   */
#include OATPP_CODEGEN_END(ApiController)
  
};

#endif /* StaticController_hpp */
