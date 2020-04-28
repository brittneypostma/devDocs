---
title: React Native
---

<p align="center">
  <img src="react/react-native.png" alt="React Native" width="50%">
</p>

## [ReactNative.dev](https://reactnative.dev/)

---

## What is React Native?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React Native allows you to build native mobile apps without using native code. How is this possible? React Native can do this because it compiles the code to the native language of both Android and IOS devices, Java/C++ for Android and Swift for IOS. This means React Native is cross-platform, write your code once and run on any IOS or Android device. You write your app in JavaScript and React code that is very similar to the React code you would write for a web application. The big differences come inside the components, we use native components instead of web components in React Native. Also, you do not render HTML and CSS does not exist in app development. 

### Components in React Native

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Since there is no such thing as HTML in the native world, our JSX needs to render something that the device can recognize. We use Native Components to do this. A **view** is the basic UI building block, similar to a div in HTML. React native invokes these native views using the React Native Components. Here is the full list of Core Components, from the [React Native Docs](https://reactnative.dev/docs/intro-react-native-components).


## Basic Components
<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>React Native UI Component</th><th>Android View</th><th>iOS View</th><th>Web Analog</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>&lt;View&gt;</code></td><td><code>&lt;ViewGroup&gt;</code></td><td><code>&lt;UIView&gt;</code></td><td>A non-scrolling <code>&lt;div&gt;</code></td><td>A container that supports layout with flexbox, style, some touch handling, and accessibility controls.</td></tr>
<tr><td><code>&lt;Text&gt;</code></td><td><code>&lt;TextView&gt;</code></td><td><code>&lt;UITextView&gt;</code></td><td><code>&lt;p&gt;</code></td><td>Displays, styles, and nests strings of text and even handles touch events.</td></tr>
<tr><td><code>&lt;Image&gt;</code></td><td><code>&lt;ImageView&gt;</code></td><td><code>&lt;UIImageView&gt;</code></td><td><code>&lt;img&gt;</code></td><td>Displays different types of images.</td></tr>
<tr><td><code>&lt;ScrollView&gt;</code></td><td><code>&lt;ScrollView&gt;</code></td><td><code>&lt;UIScrollView&gt;</code></td><td><code>&lt;div&gt;</code></td><td>A generic scrolling container that can contain multiple components and views.</td></tr>
<tr><td><code>&lt;TextInput&gt;</code></td><td><code>&lt;EditText&gt;</code></td><td><code>&lt;UITextField&gt;</code></td><td><code>&lt;input type=&quot;text&quot;&gt;</code></td><td>Allows the user to enter text.</td></tr>
</tbody>
</table>
</div>
<br/>

## User Interface
<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>React Native UI Component</th><th>Web Analog</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>&lt;Button&gt;</code></td><td><code>&lt;button&gt;</code></td><td>A component for handling touches.</td></tr>
<tr><td><code>&lt;Switch&gt;</code></td><td><code>&lt;input type="checkbox"&gt;</code></td><td>A toggle switch that renders a boolean input.</td></tr>
</tbody>
</table>
</div>
<br/>

## List Views
<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>React Native UI Component</th><th>Web Analog</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>&lt;FlatList&gt;</code></td><td><code>&lt;ul&gt;</code></td><td>A list that only renders elements currently showing on the screen, making it more performant.</td></tr>
<tr><td><code>&lt;SectionList&gt;</code></td><td><code>&lt;ul&gt;</code></td><td>Similar to a FlatList, but use if you have multiple sections in your list.</td></tr>
</tbody>
</table>
</div>
<br/>

## Others
<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>React Native UI Component</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>&lt;ActivityIndicator&gt;</code></td><td>Displays a circular loading indicator.</td></tr>
<tr><td><code>&lt;Alert&gt;</code></td><td>Launches an alert dialog with the specified title and message.</td></tr>
<tr><td><code>&lt;Animated&gt;</code></td><td>A library for creating fluid powerful animations that are easy to build and maintain.</td></tr>
<tr><td><code>&lt;Dimensions&gt;</code></td><td>Provides an interface for getting device dimensions.</td></tr>
<tr><td><code>&lt;KeyboardAvoidingView&gt;</code></td><td>Provides a view that moves out of the way of the virtual keyboard automatically.</td></tr>
<tr><td><code>&lt;Linking&gt;</code></td><td>Provides a general interface to interact with both incoming and outgoing app links.</td></tr>
<tr><td><code>&lt;Modal&gt;</code></td><td>Provides a simple way to present content above an enclosing view.</td></tr>
<tr><td><code>&lt;PixelRatio&gt;</code></td><td>Provides access to the device pixel density.</td></tr>
<tr><td><code>&lt;RefreshControl&gt;</code></td><td>This component is used inside a ScrollView to add pull to refresh functionality.</td></tr>
<tr><td><code>&lt;StatusBar&gt;</code></td><td>Component to control the app status bar.</td></tr>
</tbody>
</table>
</div>
<br/>

## Android and iOS
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Android and iOS also have some components that are specific to their devices. On iOS there is only one, the **`ActionSheetIOS`**. ActionSheetIOS displays the native Action Sheets component for iOS. It is a specific style of alert that appears in response to a control or action and gives the user two or more choices related to the current context. Android has a few components that are specific to their OS. **`BackHandler`** detects hardware button presses for back navigation. **`DrawerLayoutAndroid`** wraps the `DrawerLayout` platform that creates content that can be hidden or pulled in from the side. **`PermissionsAndroid`** provides access to the permissions model that allows the user to choose what permissions the app should have. Finally, **`ToastAndroid`** creates a toast alert notification.

---

## CSS in React Native

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Since there is no true CSS in React Native, how do we style our apps? All React Native core components accept a **`style`** prop that you can write your styles **inline**, or import the **StyleSheet** method that allows you to create classes that . Both provide a JavaScript object of camelCased CSS properties as keys and values. There are also many frameworks out there like Styled Components that would allow you to write more vanilla style CSS. There are also no units for dimensions (px, em, vw, etc.), you simply don't include them in your styles. There can either be fixed width and height or you can use flex containers to dynamically fit the components. Flexbox is used to layout components and each type of component has its own set of styles that are able to be applied to it. 

```javascript
  <View style={styles.container}>
    <Text style={styles.title}>React Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
```

## View Component Styles
<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>Property</th><th>Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>backfaceVisibility</code></td><td>'visible' or 'hidden'</td><td>Determines if the backface of an element should be visible or hidden.</td></tr>
<tr><td><code>backgroundColor</code></td><td>color</td><td>Sets the color of the background.</td></tr>
<tr><td><code>border<em style="text-decoration: underline;">Side</em>Color</code></td><td>color</td><td>The color of whatever side of the border you specify, top, right, left, or bottom. Can just be borderColor to set all 4 sides.</td></tr>
<tr><td><code>border<em style="text-decoration: underline;">Side</em><em style="text-decoration: underline;">Position</em>Radius</code></td><td>number</td><td>The corner radius of whatever side and position you specify. Sides are top, right, bottom, left. Positions are end, left, right, start. Can just be borderRadius to set all 4 corners.</td></tr>
<tr><td><code>border<em style="text-decoration: underline;">Side</em><em style="text-decoration: underline;">Position</em>Width</code></td><td>number</td><td>The width of whatever side and position you specify. Sides are top, right, bottom, left. Positions are end, left, right, start. Can just be borderWidth to set width of all 4 borders.</td></tr>
<tr><td><code>borderStyle</code></td><td>'solid', 'dotted', or 'dashed'</td><td>Sets the style of the border.</td></tr>
<tr><td><code>elevation</code></td><td>number</td><td>Android only prop that adds a drop shadow and affects the z-index for any overlapping views.</td></tr>
<tr><td><code>opacity</code></td><td>number</td><td>Sets the opacity of the component.</td></tr>
</tbody>
</table>
</div>
<br/>

## Image Component Styles

<p style="text-align: center;">Along with the all of the above props, the Image component adds the following possible properties and methods.</p>

<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>Property</th><th>Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>accessible</code></td><td>boolean</td><td>Indicates whether the image is accessible.</td></tr>
<tr><td><code>accessibilityLabel</code></td><td>string</td><td>The text that is read by a screen reader on an accessible image.</td></tr>
<tr><td><code>blurRadius</code></td><td>number</td><td>Sets the blur amount of the image. iOS has to be more than 5.</td></tr>
<tr><td><code>capInsets</code></td><td><code>object: {top: number, left: number, bottom: number, right: number}</code></td><td>When an image is resized, the corners will stay fixed to the size set.</td></tr>
<tr><td><code>defaultSource</code></td><td>number</td><td>A static image that is displayed while loading the image. Can be an object on iOS.</td></tr>
<tr><td><code>fadeDuration</code></td><td>number</td><td>Sets the duration of the fade on an element. Android only, default is 300ms.</td></tr>
<tr><td><code>loadingIndicatorSource</code></td><td>array[ImageSourcePropTypes, number]</td><td>Similar to source, represents the resource used to render the loading indicator. Displayed until the image is ready.</td></tr>
<tr><td><code>onError</code></td><td>function</td><td>Gets invoked on load error with <code>{nativeEvent: {error}}</code>.</td></tr>
<tr><td><code>onLayout</code></td><td>function</td><td>Gets invoked on mount and layout changes with <code>{nativeEvent: {layout: {x, y, width, height}}}</code></td></tr>
<tr><td><code>onLoad</code></td><td>function</td><td>Gets invoked when load completes successfully.</td></tr>
<tr><td><code>onLoadEnd</code></td><td>function</td><td>Gets invoked when load completes whether it succeeds or fails.</td></tr>
<tr><td><code>onLoadStart</code></td><td>function</td><td>Gets invoked when loading starts.</td></tr>
<tr><td><code>onPartialLoad</code></td><td>function</td><td>Gets invoked when the partial load is complete. Partial load is a </td></tr>
<tr><td><code>onProgress</code></td><td>function</td><td>Gets invoked on download progress with <code>{nativeEvent: {layout: {x, y, width, height}}}</code></td></tr>
<tr><td><code>overflow</code></td><td>'visible' or 'hidden'</td><td>Determines if the overflow of an element should be visible or hidden.</td></tr>
<tr><td><code>overlayColor</code></td><td>string</td><td>Android only property that if an image has rounded corners the overlay can be set to a solid color.</td></tr>
<tr><td><code>progressiveRenderingEnabled</code></td><td>bool</td><td>Android only. When true, enables progressive jpeg streaming.</td></tr>
<tr><td><code>resizeMethod</code></td><td>'auto', 'resize', 'scale'</td><td>Should be used if the image's dimensions differ from the image view's dimensions. Defaults to auto which uses heuristics to pick between resize and scale, resize should be used if image is much larger than the view, and scale should be used if the image is smaller than the view.</td></tr>
<tr><td><code>resizeMode</code></td><td>'cover', 'contain', 'stretch', 'repeat', 'center'</td><td>Determines how to resize the image. Cover maintains aspect ratio and scales evenly, contain fits the image inside element, stretch scales height and width independently, repeat allows the image to repeat to cover the frame, and center causes the image to center along both dimensions.</td></tr>
<tr><td><code>source</code></td><td>ImageSourcePropType</td><td>The source is either a remote or local file URL.</td></tr>
<tr><td><code>testID</code></td><td>string</td><td>Unique id to be used in testing scripts.</td></tr>
<tr><td><code>tintColor</code></td><td>color</td><td>Changes any non-transparent pixels to the tintColor.</td></tr>
<tr><td><code>getSize()</code></td><td><code>Image.getSize(uri, success, [failure])</code></td><td>Retrieve the width and height in pixels of an image before its displayed.</td></tr>
<tr><td><code>getSizeWithHeaders()</code></td><td><code>Image.getSizeWithHeaders(uri, success, [failure])</code></td><td>Retrieve the width and height in pixels of an image before its displayed with the ability to provide the headers for the request.</td></tr>
<tr><td><code>prefetch()</code></td><td><code>Image.prefetch(url)</code></td><td>Prefetches a remote image for later use by downloading it to the disk cache.</td></tr>
<tr><td><code>abortPrefetch()</code></td><td><code>Image.abortPrefetch(requestId)</code></td><td>Abort a prefetch request, android only.</td></tr>
<tr><td><code>queryCache()</code></td><td><code>Image.queryCache(urls)</code></td><td>Perform cace interrogation, returns a mapping from URL to cace status.</td></tr>
<tr><td><code>resolveAssetSource()</code></td><td><code>Image.resolveAssetSource(source)</code></td><td>Resolves an asset reference into an object with properties uri, width, height.</td></tr>
</tbody>
</table>
</div>
<br/>

## Text Component Styles

<div  style="width: 100%; overflow-x: auto;">
<table>
<thead>
<tr><th>Property</th><th>Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>color</code></td><td>color</td><td>Sets the color of the text.</td></tr>
<tr><td><code>fontFamily</code></td><td>string</td><td>Sets the font family of the text.</td></tr>
<tr><td><code>fontSize</code></td><td>number</td><td>Sets the size of the text.</td></tr>
<tr><td><code>fontStyle</code></td><td>'normal', 'italic'</td><td>Sets the style of the text.</td></tr>
<tr><td><code>fontVariant</code></td><td>'small-caps', 'oldstyle-nums', lining-nums', 'tabular-numbs', 'proportional-nums'</td><td>Sets the variant of the text on iOS only.</td></tr>
<tr><td><code>fontWeight</code></td><td>number, 'normal', 'bold'</td><td>Sets how bold the text is.</td></tr>
<tr><td><code>includeFontPadding</code></td><td>bool</td><td>False removes extra font padding, default is true.</td></tr>
<tr><td><code>letterSpacing</code></td><td>number</td><td>Increase or decrease the space between characters in the text.</td></tr>
<tr><td><code>lineHeight</code></td><td>number</td><td>Sets the position of the text along the vertical axis.</td></tr>
<tr><td><code>suppressHighlighting</code></td><td>bool</td><td>When true, no changes are made to the text. By default, a gray oval highlights the text on press down.</td></tr>
<tr><td><code>testID</code></td><td>string</td><td>Unique identifier used in testing.</td></tr>
<tr><td><code>textAlign</code></td><td>'auto', 'left', 'right', 'center', 'justify'</td><td>Sets the position of the text on the all axises.</td></tr>
<tr><td><code>textAlignVertical</code></td><td>'auto', 'top', 'bottom', 'center'</td><td>Sets the position of the text on the vertical axis.</td></tr>
<tr><td><code>textBreakStrategy</code></td><td>'simple', 'highQuality', 'balanced'</td><td>Android only, sets the way the text breaks. Default is highQuality.</td></tr>
<tr><td><code>textDecorationColor</code></td><td>color</td><td>iOS only, sets the color of the text decoration.</td></tr>
<tr><td><code>textDecorationLine</code></td><td>'none', 'underline', 'line-through', 'underline line-through'</td><td>Sets the style of the text decoration.</td></tr>
<tr><td><code>textDecorationStyle</code></td><td>'solid', 'double', 'dotted', 'dashed'</td><td>iOS only, sets the style of the text.</td></tr>
<tr><td><code>textShadowColor</code></td><td>color</td><td>Sets the color of the text shadow.</td></tr>
<tr><td><code>textShadowOffset</code></td><td>object: {width: number, height: number}</td><td>Sets the offset of the text shadow.</td></tr>
<tr><td><code>textShadowRadius</code></td><td>number</td><td>Sets the blur radius of the text shadow.</td></tr>
<tr><td><code>textTransform</code></td><td>'none', 'uppercase', 'lowercase', 'capitalize'</td><td>Sets the way to transform the text.</td></tr>
<tr><td><code>writingDirection</code></td><td>'auto', 'ltr', 'rtl'</td><td>iOS only, sets the direction of the text.</td></tr>
</tbody>
</table>
</div>
<br/>

## Button

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buttons 
```javascript
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## Transforms

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transforms are style properties that will modify the appearance of an element.

```javascript
<View style={[styles.box, {
        transform: [
          { rotateX: "45deg" },
          { rotateZ: "45deg" }
        ]
      }]}>
```
