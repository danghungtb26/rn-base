

#include "JSIJNIConversion.h"

#include <jsi/jsi.h>
#include <jni.h>
#include <fbjni/fbjni.h>
#include <android/log.h>

#include <string>
#include <utility>

#include <react/jni/NativeMap.h>
#include <react/jni/ReadableNativeMap.h>
#include <react/jni/WritableNativeMap.h>

#include <jsi/JSIDynamic.h>
#include <folly/dynamic.h>

#include "JSafeAreaInset.h"



    using namespace facebook;

    jsi::Value JSIJNIConversion::convertJNIObjectToJSIValue(jsi::Runtime &runtime, const jni::local_ref<jobject>& object) {
        if (object == nullptr) {
            // null

            return jsi::Value::undefined();

        } else if (object->isInstanceOf(jni::JBoolean::javaClassStatic())) {
            // Boolean

            static const auto getBooleanFunc = jni::findClassLocal(
                    "java/lang/Boolean")->getMethod<jboolean()>("booleanValue");
            auto boolean = getBooleanFunc(object.get());
            return jsi::Value(boolean == true);

        } else if (object->isInstanceOf(jni::JDouble::javaClassStatic())) {
            // Double

            static const auto getDoubleFunc = jni::findClassLocal(
                    "java/lang/Double")->getMethod<jdouble()>("doubleValue");
            auto d = getDoubleFunc(object.get());
            return jsi::Value(d);


        } else if (object->isInstanceOf(jni::JFloat::javaClassStatic())) {
        // Float

        static const auto getDoubleFunc = jni::findClassLocal(
                "java/lang/Float")->getMethod<jdouble()>("floatValue");
        auto d = getDoubleFunc(object.get());
        return jsi::Value(d);

        }
        else if (object->isInstanceOf(jni::JInteger::javaClassStatic())) {
            // Integer

            static const auto getIntegerFunc = jni::findClassLocal(
                    "java/lang/Integer")->getMethod<jint()>("intValue");
            auto i = getIntegerFunc(object.get());
            return jsi::Value(i);

        } else if (object->isInstanceOf(jni::JString::javaClassStatic())) {
            // String

            return jsi::String::createFromUtf8(runtime, object->toString());

        }
        else if (object->isInstanceOf(ghost::JSafeAreaInset::javaClassStatic())) {
            // Contact

            auto inset = facebook::jni::static_ref_cast<ghost::JSafeAreaInset>(object);

            jsi::Object result(runtime);
            result.setProperty(runtime, "top", inset->getSafeAreaInsetsTop());
            result.setProperty(runtime, "bottom", inset->getSafeAreaInsetsBottom());
            result.setProperty(runtime, "right", inset->getSafeAreaInsetsRight());
            result.setProperty(runtime, "left", inset->getSafeAreaInsetsLeft());
            return result;
        }
        else if (object->isInstanceOf(jni::JHashMap<jstring, jobject>::javaClassStatic())) {
            // HashMap<K, V>

            auto map = facebook::jni::static_ref_cast<jni::JHashMap<jstring, jobject>>(object);

            auto result = jsi::Object(runtime);
            for (const auto &entry : *map) {
                auto key = entry.first->toString();
                auto value = entry.second;
                if (!value) continue;

                auto jsiValue = convertJNIObjectToJSIValue(runtime, value);
                result.setProperty(runtime, key.c_str(), jsiValue);
            }
            return result;

        } else if (object->isInstanceOf(react::ReadableMap::javaClassStatic())) {
            // ReadableMap

            static const auto toHashMapFunc = react::ReadableMap::javaClassLocal()->getMethod<jni::JHashMap<jstring, jobject>()>(
                    "toHashMap");

            // call recursive, this time HashMap<K, V>
            auto hashMap = toHashMapFunc(object.get());
            return convertJNIObjectToJSIValue(runtime, hashMap);

        }

        auto type = object->getClass()->toString();
        auto message = "Received unknown JNI type \"" + type + "\"! Cannot convert to jsi::Value.";
        __android_log_write(ANDROID_LOG_ERROR, "AAAAAA", message.c_str());
//        throw std::runtime_error(message);
        return jsi::Value::undefined();
    }




