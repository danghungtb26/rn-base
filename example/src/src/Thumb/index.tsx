import React, { useState, useMemo } from 'react'
import { Box } from '@dvh-module/element'
import { StyleSheet, ActivityIndicator, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'

interface IThumb {
  /**
   * uri của ảnh nền
   */
  uriBack: string
  /**
   *  uri của ảnh tải về
   */
  uriTop: string
  /**
   * style cho box container image
   */
  styleBox?: any
  /**
   * style cho image
   */
  style?: any
  /**
   * style cho icon loading
   */
  styleLoading?: ViewStyle
}

export const Thumb = (props: IThumb) => {
  const { uriBack, uriTop, styleBox, style, styleLoading, ...restProps } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })

  /** bắt đầu load ảnh mới*/
  const onLoadStart = () => {
    setLoading(true)
  }

  /** kết thúc load */
  const onLoadEnd = () => {
    setLoading(false)
  }

  /** trạng thái ảnh tải về true/false */
  const success: boolean = useMemo(() => {
    return uriTop ? true : false
  }, [uriTop])

  /** render ảnh nền:
   * nếu loadding = true -> hiển thị ảnh nền và blurRadius
   * nếu success = false && loading = false -> hiển thị ảnh nền
   */
  const renderBack: () => React.ReactElement = () => {
    return (
      <FastImage
        onLoadStart={onLoadStart}
        source={{ uri: uriBack }}
        style={[styles.back, style]}
        {...restProps}
      />
    )
  }

  /** render ảnh tải về
   * nếu loading = true | success = false -> không hiển thị
   * nếu success = true -> hiển thị
   */
  const renderTop: () => React.ReactElement = () => {
    return (
      <FastImage
        source={{ uri: uriTop, priority: FastImage.priority.low }}
        onLoadEnd={onLoadEnd}
        style={[styles.top, style]}
        {...restProps}
      />
    )
  }

  /** lấy chiều cao và rộng của div ảnh -> hiển thị loading ở absolute ở chính giữa */
  const getMeasure = (layout: any) => {
    setLayout(layout)
  }

  /** lấy ra left absolute của icon loading */
  const getLeft = useMemo(() => {
    return layout.width !== 0 ? layout.width / 2 - 10 : 0
  }, [layout.width])

  /** lấy ra top absolute của icon loading */
  const getTop = useMemo(() => {
    return layout.height !== 0 ? layout.height / 2 - 10 : 0
  }, [layout.height])

  /** render icon loading */
  const renderLoading = () => {
    return (
      <>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#F7941C"
            style={[
              styles.loading,
              { position: 'absolute', top: getTop, left: getLeft },
              styleLoading,
            ]}
          />
        ) : null}
      </>
    )
  }

  return (
    <Box
      style={[styles.image_container, styleBox]}
      onLayout={event => {
        getMeasure(event.nativeEvent.layout)
      }}>
      {renderTop()}
      {!success ? renderBack() : null}
      {renderLoading()}
    </Box>
  )
}
const styles = StyleSheet.create({
  image_container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: 100,
    height: 100,
    zIndex: 1,
  },
  back: {
    borderRadius: 4,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  top: {
    borderRadius: 4,
    width: '100%',
    height: '100%',
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loading: {
    zIndex: 10,
  },
})

export default Thumb
