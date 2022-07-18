//
//  Sitemap.hpp
//  Site
//
//  Created by Leonid on 4/29/18.
//  Copyright © 2018 oatpp. All rights reserved.
//

#ifndef Sitemap_hpp
#define Sitemap_hpp

#include "oatpp/core/data/stream/BufferStream.hpp"
#include <unordered_map>

class Sitemap {
private:
  constexpr static v_int32 URLS_PER_FILE = 10000;
private:

  void startNewUrlsFile();
  void finishUrlsFile();

private:
  std::unordered_map<v_int32, oatpp::String> m_urlsByIndex;
  oatpp::String m_baseSitemapUrl;
  oatpp::data::stream::BufferOutputStream m_indexStream;
  oatpp::data::stream::BufferOutputStream m_currUrlsStream;
  v_int32 m_urlCounter;
  v_int32 m_currUrlsStreamIndex;
  oatpp::String m_indexFile;
public:

  Sitemap(const oatpp::String& baseUrl);

  void addUrl(const oatpp::String url);

  oatpp::String getIndexFile() const;
  oatpp::String getUrlsFile(v_int32 index) const;

  void build();

};

#endif /* Sitemap_hpp */