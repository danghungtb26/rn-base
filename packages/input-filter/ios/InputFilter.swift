import Foundation
import UIKit

@objc(RNCustomInput)
class CustomInput: NSObject, RCTBridgeModule {
    static func moduleName() -> String! {
        return "RNCustomInput"
    }
    
    static let CHARACTER_FILTER = "character"
    
    static let REGEX_FILTER = "regex"
    
    
    var keys: [String : Any] = [String : Any]()
    @objc static func requiresMainQueueSetup() -> Bool {
        true
    }
    
    var methodQueue: DispatchQueue {
        bridge.uiManager.methodQueue
    }
    
    var bridge: RCTBridge!
    
    @objc
    func constantsToExport() -> [AnyHashable : Any]! {
        return [
            "character": CustomInput.CHARACTER_FILTER,
            "regex": CustomInput.REGEX_FILTER
        ]
    }
    
    
    
    @objc(setCustom:options:)
    func setCustom(reactNode: NSNumber, options: NSDictionary) {
        if let filters = options.value(forKey: "filter") as? NSArray {
            bridge.uiManager.addUIBlock { (uiManager, viewRegistry) in
                
                DispatchQueue.main.async {
                    guard let view = viewRegistry?[reactNode] as? RCTBaseTextInputView else { return }
                    let key = reactNode.stringValue
                    
                    let textView = view.backedTextInputView as! RCTUITextField
                    self.keys[key] = CustomInputDelegate(textField: textView, filters: filters)
                    textView.removeTarget(textView.delegate, action: nil, for: .editingChanged)
                    textView.removeTarget(textView.delegate, action: nil, for: .editingChanged)
                    textView.delegate = self.keys[key] as? UITextFieldDelegate
                }
            }
        }
    }
    
    @objc(unSet:)
    func unSet(reactNode: NSNumber) {
        self.keys.removeValue(forKey: reactNode.stringValue)
    }
}

class CustomInputDelegate: RCTBackedTextFieldDelegateAdapter {
    
    var filters: NSArray?
    init(textField backedTextInputView: UITextField & RCTBackedTextInputViewProtocol, filters: NSArray) {
        super.init(textField: backedTextInputView)
        self.filters = filters
    }
    
    override func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        guard !string.isEmpty else {
            // Backspace detected, allow text change, no need to process the text any further
            return true
        }
        
        guard filters?.count ?? 0 > 0 else {
            
            
            return super.textField(textField, shouldChangeCharactersIn: range, replacementString: string)
        }
        
        let check = filters!.reduce(true, {
            preV, filter in
            if let text = (filter as AnyObject).object(forKey: "text") as? String {
                let type = (filter as AnyObject).object(forKey: "type") as? String
                
                // regex
                if type == CustomInput.REGEX_FILTER {
                    do {
                        let regex = try NSRegularExpression(pattern: text)
                        let matches = regex.matches(in: string, range: NSRange(location: 0, length: string.count))
                        return matches.count != 0 && preV
                    } catch {
                        return preV
                    }
                }
                // character
                if type == CustomInput.CHARACTER_FILTER {
                    var invalidCharacters = CharacterSet(charactersIn: text)
                    if let inverted = (filter as AnyObject).object(forKey: "inverted") as? Bool {
                        if inverted {
                            invalidCharacters = invalidCharacters.inverted
                        }
                    }
                    return (string.rangeOfCharacter(from: invalidCharacters) != nil) && preV
                }
            }
            return preV
        })
        
        return check && super.textField(textField, shouldChangeCharactersIn: range, replacementString: string)
    }
    
}

