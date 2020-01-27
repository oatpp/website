cmake_minimum_required(VERSION 3.1)

option(RUN_PROD "Prod?" OFF)

set(project_name oatpp-website) ## rename your project here

project(${project_name})

set(CMAKE_CXX_STANDARD 11)

add_library(${project_name}-lib
        src/AppComponent.hpp
        src/SitePath.hpp
        src/controller/StaticController.hpp
        src/StaticFileManager.cpp
        src/StaticFileManager.hpp
        src/FilesIndex.cpp
        src/FilesIndex.hpp
        src/Sitemap.cpp
        src/Sitemap.hpp
)

## link libs

find_package(oatpp          1.0.0 REQUIRED)
find_package(oatpp-libressl 1.0.0 REQUIRED)

include(FindPkgConfig) # <-- include pkg-config needed by FindLibreSSL.cmake script
list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_LIST_DIR}/cmake") # <-- use FindLibreSSL.cmake in /cmake folder

find_package(LibreSSL 3.0.0 REQUIRED)

target_link_libraries(${project_name}-lib
        PUBLIC oatpp::oatpp
        PUBLIC oatpp::oatpp-test
        PUBLIC oatpp::oatpp-libressl
)

target_include_directories(${project_name}-lib
        PUBLIC /usr/local/include
)

link_directories(/usr/local/lib)

target_include_directories(${project_name}-lib PUBLIC src)

add_definitions(
        -DSTATIC_RES_PATH="${CMAKE_CURRENT_LIST_DIR}/../../docs/.vuepress/dist"
)

if(RUN_PROD)
    add_definitions(-DOATPP_TARGET_APP)
endif()

## add executables

add_executable(${project_name}-exe
        src/App.cpp
)

target_link_libraries(${project_name}-exe ${project_name}-lib)
add_dependencies(${project_name}-exe ${project_name}-lib)

add_executable(${project_name}-test
        test/tests.cpp
)
target_link_libraries(${project_name}-test ${project_name}-lib)
add_dependencies(${project_name}-test ${project_name}-lib)
