//
// Created by Leonid on 2019-02-10.
//

#include "FilesIndex.hpp"

#include <dirent.h>

bool FilesIndex::isValidDirName(const oatpp::String& name){

  if(name->getSize() == 0){
    return false;
  }

  for(v_int32 i = 0; i < name->getSize(); i++){
    v_char8 a = name->getData()[i];
    if(a == '.' || a == ' '){
      return false;
    }
  }

  return true;

}

bool FilesIndex::isValidFileName(const oatpp::String& name){

  if(name->getSize() == 0){
    return false;
  }

  if(name->getData()[0] == '.'){
    return false;
  }

  for(v_int32 i = 0; i < name->getSize(); i++){
    v_char8 a = name->getData()[i];
    if(a == ' ' || a == '/' || a == '\\' || a == '&' || a == '@'){
      return false;
    }
  }

  return true;

}

void FilesIndex::scanDir(const oatpp::String& relPath, std::list<oatpp::String>& dirsFound) {

  oatpp::String fullDirPath;
  if(relPath->getSize() > 0) {
    fullDirPath = m_baseDir + oatpp::String("/") + relPath;
  } else {
    fullDirPath = m_baseDir;
  }

  DIR *d;
  struct dirent *dir;
  d = opendir((const char*)fullDirPath->getData());

  if(d){
    while ((dir = readdir(d)) != NULL){
      if(dir->d_type == DT_DIR){
        if(isValidDirName(dir->d_name)) {

          if(relPath->getSize() > 0) {
            dirsFound.push_back(relPath + oatpp::String("/") + dir->d_name);
          } else {
            dirsFound.push_back(dir->d_name);
          }
        }

      }else if(dir->d_type == DT_REG){
        if(isValidFileName(dir->d_name)) {
          auto info = std::make_shared<FileInfo>();
          info->path = fullDirPath + "/" + dir->d_name;
          if(oatpp::base::StrBuffer::equals(dir->d_name, "index.html")) {
            info->key = relPath + "/";
            if(relPath->getSize() > 0) {
              m_sitemap.addUrl(SitePath::CanonicalBase + oatpp::String("/") + info->key);
            } else {
              m_sitemap.addUrl(SitePath::CanonicalBase + info->key);
            }
          } else {
            if(relPath->getSize() > 0) {
              info->key = relPath + "/" + dir->d_name;
            } else {
              info->key = dir->d_name;
            }
          }
          m_files[info->key] = info;
        }
      }
    }
    closedir(d);
  }

}

void FilesIndex::buildIndex() {

  OATPP_LOGD("FilesIndex", "scanning dir '%s'", m_baseDir->c_str());

  std::list<oatpp::String> scanDirs;
  scanDirs.push_back("");

  do {

    std::list<oatpp::String> newDirs;

    auto it = scanDirs.begin();
    while (it != scanDirs.end()) {
      auto str = *it++;
      OATPP_LOGD("FilesIndex", "scanning dir '%s'", str->c_str());
      scanDir(str, newDirs);
    }

    scanDirs = newDirs;

  } while(!scanDirs.empty());

  OATPP_LOGD("\nFilesIndex", "%d files found", m_files.size());

  auto it = m_files.begin();
  while(it != m_files.end()) {
    OATPP_LOGD("FilesIndex", "file '%s' --> '%s'", it->first->c_str(), it->second->path->c_str());
    it ++;
  }

  m_sitemap.build();

}