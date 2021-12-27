//
// Created by Đặng Văn Hùng on 2021-12-24.
//

#pragma once

#include <jsi/jsi.h>
#include <jni.h>
#include <fbjni/fbjni.h>

    namespace JSIJNIConversion {

        using namespace facebook;

        jsi::Value convertJNIObjectToJSIValue(jsi::Runtime& runtime, const jni::local_ref<jobject>& object);

    } // namespace JSIJNIConversion

