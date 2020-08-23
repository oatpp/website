#!/bin/sh

cd ../../

apt-get install -y zlib1g-dev
apt-get install -y cmake
apt-get install -y pkg-config
apt-get install -y build-essential

#####################################################

git clone https://github.com/oatpp/oatpp

cd oatpp
mkdir build && cd build

cmake -DCMAKE_BUILD_TYPE=Release -DOATPP_BUILD_TESTS=OFF ..
make install

cd ../../

#####################################################

git clone https://github.com/oatpp/oatpp-libressl

cd oatpp-libressl

./utility/install-deps/install-libressl.sh

mkdir build && cd build

cmake -DCMAKE_BUILD_TYPE=Release ..
make install

cd ../../

#####################################################

git clone https://github.com/oatpp/oatpp-zlib

cd oatpp-zlib

mkdir build && cd build

cmake ..
make install

cd ../../

#####################################################

cd website/server/main

mkdir build && cd build

cmake ..
make

