cmake_minimum_required(VERSION 3.9.0)

set (PACKAGE_NAME "cpp-rn-base-native")
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set (CMAKE_CXX_FLAGS "-DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_HAVE_MEMRCHR=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_MOBILE=1 -DON_ANDROID -DONANDROID")

file (GLOB LIBFBJNI_INCLUDE_DIR "${BUILD_DIR}/fbjni-*-headers.jar/")


add_library(
        ${PACKAGE_NAME}  # <-- Library name
        SHARED
        src/main/cpp/JSafeAreaInset.cpp
        src/main/cpp/cpp-adapter.cpp
        src/main/cpp/JSISafeAreaInsets.cpp
        src/main/cpp/JSIJNIConversion.cpp
        )


target_include_directories(
        ${PACKAGE_NAME}
        PRIVATE
        "${LIBFBJNI_INCLUDE_DIR}"
        "${BUILD_DIR}/third-party-ndk/boost"
        "${BUILD_DIR}/third-party-ndk/double-conversion"
        "${BUILD_DIR}/third-party-ndk/folly"
        "${BUILD_DIR}/third-party-ndk/glog"
        "${NODE_MODULES_DIR}/react-native/React"
        "${NODE_MODULES_DIR}/react-native/React/Base"
        "${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/jni"
        "${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/jni"
        "${NODE_MODULES_DIR}/react-native/ReactCommon"
        "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
        src/main/cpp
)


set_target_properties(
        ${PACKAGE_NAME} PROPERTIES
        CXX_STANDARD 17
        CXX_EXTENSIONS OFF
        POSITION_INDEPENDENT_CODE ON
)

file (GLOB LIBRN_DIR "${BUILD_DIR}/react-native-0*/jni/${ANDROID_ABI}")

find_library(
        log-lib
        log
)

# find_package(fbjni REQUIRED CONFIG)

find_library(
        FBJNI_LIB
        fbjni
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

find_library(
        FOLLY_JSON_LIB
        folly_json
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)
find_library(
        REACT_NATIVE_JNI_LIB
        reactnativejni
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)
#find_library(
#        JSI_LIB
#        jsi
#        PATHS ${LIBRN_DIR}
#        NO_CMAKE_FIND_ROOT_PATH
#)

target_link_libraries(
        ${PACKAGE_NAME}
        ${log-lib}
        ${FBJNI_LIB}
#        fbjni::fbjni

#        ${JSI_LIB}
        ${REACT_NATIVE_JNI_LIB}

        ${FOLLY_JSON_LIB}
        android
)
