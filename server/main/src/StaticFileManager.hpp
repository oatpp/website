//
// Created by Leonid on 2019-01-31.
//

#ifndef OATPP_STATIC_SERVER_STATICFILEMANAGER_HPP
#define OATPP_STATIC_SERVER_STATICFILEMANAGER_HPP

#include "oatpp/core/data/share/MemoryLabel.hpp"
#include "oatpp/core/concurrency/SpinLock.hpp"
#include "oatpp/core/Types.hpp"

class StaticFileManager {
private:
  std::unordered_map<oatpp::String, oatpp::String> m_cache;
public:

  oatpp::String getFile(const oatpp::String& filename, bool cache);

};


#endif //OATPP_STATIC_SERVER_STATICFILEMANAGER_HPP
