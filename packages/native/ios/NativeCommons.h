#import <React/RCTBridgeModule.h>

@interface NativeCommonManager : NSObject <RCTBridgeModule>

@property (nonatomic, assign) BOOL setBridgeOnMainQueue;

@end
