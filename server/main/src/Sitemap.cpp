//
// Created by Leonid on 2019-02-10.
//

#include "Sitemap.hpp"

Sitemap::Sitemap(const oatpp::String& baseUrl)
  : m_baseSitemapUrl(baseUrl)
  , m_indexStream(oatpp::data::stream::ChunkedBuffer::createShared())
  , m_currUrlsStream(oatpp::data::stream::ChunkedBuffer::createShared())
  , m_urlCounter(0)
  , m_currUrlsStreamIndex(0)
  , m_indexFile(nullptr)
{

  *m_indexStream
    << "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
    << "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

}

void Sitemap::startNewUrlsFile(){
  *m_currUrlsStream
    << "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
    << "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
  m_currUrlsStreamIndex ++;
}

void Sitemap::finishUrlsFile(){
  if(m_currUrlsStream->getSize() > 0) {
    *m_currUrlsStream << "</urlset>";
    m_urlsByIndex[m_currUrlsStreamIndex] = oatpp::String(m_currUrlsStream->toString());
    m_currUrlsStream->clear();
    *m_indexStream
      << "<sitemap>"
      << "<loc>"
      << m_baseSitemapUrl << m_currUrlsStreamIndex
      << "</loc>"
      << "</sitemap>\n";
  }
}

void Sitemap::addUrl(const oatpp::String url) {
  if(m_urlCounter % URLS_PER_FILE == 0) {
    finishUrlsFile();
    startNewUrlsFile();
  }
  *m_currUrlsStream
    << "<url>"<< "<loc>" << url << "</loc>" << "</url>\n";
  m_urlCounter ++;
}

oatpp::String Sitemap::getIndexFile() const {
  return m_indexFile;
}

oatpp::String Sitemap::getUrlsFile(v_int32 index) const {
  auto it = m_urlsByIndex.find(index);
  if(it == m_urlsByIndex.end()) {
    throw std::runtime_error("No such sitemap");
  }
  return it->second;
}

void Sitemap::build() {
  finishUrlsFile();
  *m_indexStream << "</sitemapindex>";
  m_indexFile = oatpp::String(m_indexStream->toString());


  OATPP_LOGD("Sitemap", "page_count=%d", m_urlCounter);

}