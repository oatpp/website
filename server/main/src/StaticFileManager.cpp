//
// Created by Leonid on 2019-01-31.
//

#include "StaticFileManager.hpp"

oatpp::String StaticFileManager::getFile(const oatpp::String &filename, bool cache) {

  auto it = m_cache.find(filename);
  oatpp::String buffer;
  if(it == m_cache.end()) {
    buffer = oatpp::base::StrBuffer::loadFromFile(filename->c_str());
    if(buffer && cache){
      m_cache[filename] = buffer;
    }
  } else {
    buffer = it->second;
  }

  return buffer;

}