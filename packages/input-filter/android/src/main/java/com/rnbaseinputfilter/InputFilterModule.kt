package com.rnbaseinputfilter

import android.text.InputFilter
import android.text.Spanned
import android.util.Log
import android.widget.EditText
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.UIManagerModule

class InputFilterModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  companion object {
    const val regex = "regex"
    const val character = "character"
  }

  override fun getName(): String = "RNCustomInput"

  @ReactMethod
  fun setCustom(tag: Int, options: ReadableMap) {
    val filters = if(checkNull(options, "filter"))  options.getArray("filter") else null;
    filters?.let { it ->
      if(it.size() <= 0) return

      val uiManager: UIManagerModule? = reactContext.getNativeModule(UIManagerModule::class.java)
      uiManager?.addUIBlock { nativeViewHierarchyManager ->
        val editText = nativeViewHierarchyManager.resolveView(tag)
        if(editText is EditText) {
          editText.filters = editText.filters.plus(object : InputFilter {
            override fun filter(
              source: CharSequence?,
              start: Int,
              end: Int,
              dest: Spanned?,
              dstart: Int,
              dend: Int
            ): CharSequence? {

              var s = source?.subSequence(start, end)

              if(s == null) return s

              var check = true

              for ( i in 0 until it.size()) {
                val filter = it.getMap(i)
                val type = if (checkNull(filter, "type")) filter?.getString("type") else null

                val text = if (checkNull(filter, "text")) filter?.getString("text") else ""
                text?.let {it2 ->
                  if(it2.isNotEmpty()) {
                    if(type == regex) {
                      s = s?.replace(it2.toRegex(), "")


                    }

                    if(type == character) {
                      for (element in it2) {
                        s = s?.replace(element.toString().toRegex(), "")
                      }
                    }

                    check = check && s?.length !== source?.subSequence(start, end)?.length
                  }
                }

              }



              return if(check) source?.subSequence(start, end) else ""
            }
          })

        }
      }
    }
  }

  fun checkNull(value: ReadableMap?, key: String) : Boolean {
    if(value == null) return false

    if(!value.hasKey(key)) return false

    if(value.getType(key) == ReadableType.Null) return false

    return true
  }

  override fun getConstants(): Map<String, Any>? {
    val constants: MutableMap<String, Any> = HashMap()
    constants["regex"] = regex
    constants["character"] = character
    return constants
  }


}
