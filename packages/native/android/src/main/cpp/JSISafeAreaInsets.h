#pragma once
#include <jsi/jsi.h>
#include <fbjni/fbjni.h>
#include "JSafeAreaInset.h"

using namespace facebook;

class JSISafeAreaInsets : public jsi::HostObject {
    public:
        JSISafeAreaInsets(jni::alias_ref<ghost::JSafeAreaInset::javaobject> inset): _inset(jni::make_global(inset)) {};
        jsi::Value get(jsi::Runtime &, const jsi::PropNameID &name) override;

        std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime &rt) override;
    private:
        jni::global_ref<ghost::JSafeAreaInset::javaobject> _inset;
};
