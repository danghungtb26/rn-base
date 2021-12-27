//
// Created by Đặng Văn Hùng on 2021-12-24.
//

#include "JSafeAreaInset.h"
#include <jni.h>
#include <fbjni/fbjni.h>



namespace ghost {
    using namespace facebook;
    using namespace jni;
    jdouble JSafeAreaInset::getSafeAreaInsetsTop() {
        auto field = getClass()->getField<jdouble>("safeAreaInsetsTop");
        return getFieldValue(field);
    }

    jdouble JSafeAreaInset::getSafeAreaInsetsLeft() {
        auto field = getClass()->getField<jdouble>("safeAreaInsetsLeft");
        return getFieldValue(field);
    }

    jdouble JSafeAreaInset::getSafeAreaInsetsRight() {
        auto field = getClass()->getField<jdouble>("safeAreaInsetsRight");
        return getFieldValue(field);
    }

    jdouble JSafeAreaInset::getSafeAreaInsetsBottom() {
        auto field = getClass()->getField<jdouble>("safeAreaInsetsBottom");
        return getFieldValue(field);
    }


}

