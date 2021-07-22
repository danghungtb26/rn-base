#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(RNCustomInput, NSObject)

RCT_EXTERN_METHOD(setCustom:(nonnull NSNumber *)reactNode
                  options:(NSDictionary *)options)


@end
