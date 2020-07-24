---
title: Supported Platforms
description: List of platforms and operating systems supported by oatpp web framework. 
sidebarDepth: 0
---

# Supported Platforms <seo/>

## Maintained on regular basis

- **Linux**
- **BSD**
- **MacOS**
- **Windows** - special thanks to Benedikt-Alexander Mokroß - [bamkrs](https://github.com/bamkrs)

## Special Support

- **OpenWRT** - see [Oat++ OpenWRT feed](https://github.com/oatpp/oatpp-openwrt-feed)
containing build-scripts, options and patches for applications, modules and libraries provided by Oat++.

## Known Builds

- **Android** - see story on Github - <https://github.com/oatpp/oatpp/issues/9>
- **iOS** - see story on Github - <https://github.com/oatpp/oatpp/issues/9>
- **iOS 8 and earlier** - with special `-DOATPP_COMPAT_BUILD_NO_THREAD_LOCAL` flag.  
See story on Github - <https://github.com/oatpp/oatpp/issues/81>
- **Nvidia Jetson Xavier** - see story on Github - <https://github.com/oatpp/oatpp/issues/83>
- **Odroid XU4(Ubuntu)**
- **Onion Omega2S+ (600mhz RAMIPS with 128mb RAM) running OpenWRT** - with `-DOATPP_DISABLE_POOL_ALLOCATIONS` flag.  
Makefile - <https://gist.github.com/bamkrs/c6a5825734fb3eb51c23a33d0f8c83f4>.
- **Allwinner V3s (cortexa7, 64mb RAM, 1.2GHz) running OpenWRT** - with `-DOATPP_DISABLE_POOL_ALLOCATIONS` flag.  
Makefile - <https://gist.github.com/bamkrs/c6a5825734fb3eb51c23a33d0f8c83f4>
