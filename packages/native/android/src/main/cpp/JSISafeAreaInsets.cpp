#include "JSISafeAreaInsets.h"
#include "JSIJNIConversion.h"
#include <jsi/jsi.h>
#include <fbjni/fbjni.h>

using namespace facebook;
using namespace jsi;

Value JSISafeAreaInsets::get(Runtime& runtime, const PropNameID &propName) {
    auto name = propName.utf8(runtime);

    if(name == "top") {
        return Value(_inset->getSafeAreaInsetsTop());
    }
    if(name == "right") {
        return Value(_inset->getSafeAreaInsetsRight());
    }
    if(name == "left") {
        return Value(_inset->getSafeAreaInsetsLeft());
    }
    if(name == "bottom") {
        return Value(_inset->getSafeAreaInsetsBottom());
    }
    return Value::undefined();
}

std::vector<jsi::PropNameID> JSISafeAreaInsets::getPropertyNames(Runtime &rt) {
    std::vector<jsi::PropNameID> result;
    result.push_back(jsi::PropNameID::forUtf8(rt, std::string("top")));
    result.push_back(jsi::PropNameID::forUtf8(rt, std::string("right")));
    result.push_back(jsi::PropNameID::forUtf8(rt, std::string("bottom")));
    result.push_back(jsi::PropNameID::forUtf8(rt, std::string("left")));
    return result;
}
