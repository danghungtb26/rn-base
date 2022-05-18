//
// Created by Đặng Văn Hùng on 2021-12-24.
//

#pragma once

#include <jni.h>
#include <fbjni/fbjni.h>
#include <jsi/jsi.h>
#include <string>

namespace ghost {
    using namespace facebook;
    using namespace jni;

    struct JSafeAreaInset : public JavaClass<JSafeAreaInset> {
        static constexpr auto kJavaDescriptor = "Lcom/rnbasenative/SafeAreaInset;";

        jdouble getSafeAreaInsetsTop();
        jdouble getSafeAreaInsetsLeft();
        jdouble getSafeAreaInsetsRight();
        jdouble getSafeAreaInsetsBottom();
    };
}


