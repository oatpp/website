//
// Created by Leonid on 2019-02-10.
//

#ifndef OATPP_WEBSITE_FILESINDEX_HPP
#define OATPP_WEBSITE_FILESINDEX_HPP

#include "Sitemap.hpp"
#include "SitePath.hpp"
#include "oatpp/core/Types.hpp"
#include <unordered_map>

/**
 * Index of all files in the baseDir;
 */
class FilesIndex {
public:
  struct FileInfo {
    oatpp::String key; // relative path key // ex. for "/path/index.html" key="/path/" for "/path/file.js" key="path/file.js"
    oatpp::String path; // abs path
    oatpp::String mimeType;
  };
private:
  oatpp::String m_baseDir;
  Sitemap m_sitemap;
  std::unordered_map<oatpp::String, std::shared_ptr<FileInfo>> m_files; // relative path to FileInfo

private:
  bool isValidDirName(const oatpp::String& name);
  bool isValidFileName(const oatpp::String& name);
  void scanDir(const oatpp::String& relPath, std::list<oatpp::String>& dirsFound);
public:


  FilesIndex(const oatpp::String& baseDir)
    : m_baseDir(baseDir)
    , m_sitemap(SitePath::CanonicalBase + oatpp::String("/sitemap/"))
  {}

  void buildIndex();

  std::shared_ptr<FileInfo> getFileInfo(const oatpp::String& key) {
    auto it = m_files.find(key);
    if(it != m_files.end()) {
      return it->second;
    }
    return nullptr;
  }

  Sitemap& getSitemap() {
    return m_sitemap;
  }


};


#endif //OATPP_WEBSITE_FILESINDEX_HPP
