# Custom Framer Gradient Integration Guide

## 🎨 How to Add Your Custom Framer Gradient

### Step 1: Extract Colors from Framer
1. Open your Framer project
2. Select your animated gradient
3. Note down the hex color codes used in your gradient
4. Copy the colors in the order they appear

### Step 2: Update the Gradient Colors

Open `src/components/CustomFramerGradient.tsx` and find this section:

```typescript
// Replace these colors with your actual Framer gradient colors
const framerColors = [
  '#667eea', // Blue
  '#764ba2', // Purple
  '#f093fb', // Pink
  '#f5576c', // Red
  '#4facfe', // Light Blue
  '#00f2fe', // Cyan
  '#43e97b', // Green
  '#38f9d7', // Teal
];
```

Replace the `framerColors` array with your actual colors:

```typescript
const framerColors = [
  '#your-color-1',
  '#your-color-2',
  '#your-color-3',
  '#your-color-4',
  // Add more colors as needed
];
```

### Step 3: Customize Animation Settings

You can also adjust the animation properties:

```typescript
<CustomFramerGradient 
  colors={framerColors} 
  className="opacity-20" 
  duration={10}  // Animation duration in seconds
/>
```

### Step 4: Advanced Customization

For more control, you can create a completely custom gradient:

```typescript
// In your component
const myCustomColors = ['#ff0000', '#00ff00', '#0000ff'];

<CustomFramerGradient 
  colors={myCustomColors}
  className="opacity-30"
  duration={15}
>
  {/* Optional: Add content inside the gradient */}
</CustomFramerGradient>
```

## 🎯 Available Components

### 1. `CustomFramerGradient`
- Most flexible component
- Takes an array of colors
- Customizable duration and styling

### 2. `FramerLoginBackground`
- Pre-configured for login page
- Includes floating elements
- Easy to customize colors

### 3. `AnimatedGradient`
- Multiple preset variants
- Good for quick implementation

## 🎨 Example Color Schemes

### Ocean Theme
```typescript
const oceanColors = [
  '#0ea5e9', // Sky blue
  '#0284c7', // Blue
  '#0369a1', // Dark blue
  '#075985', // Navy
  '#0c4a6e', // Deep navy
];
```

### Sunset Theme
```typescript
const sunsetColors = [
  '#f97316', // Orange
  '#ea580c', // Dark orange
  '#dc2626', // Red
  '#b91c1c', // Dark red
  '#991b1b', // Deep red
];
```

### Neon Theme
```typescript
const neonColors = [
  '#06ffa5', // Neon green
  '#00d4ff', // Neon blue
  '#ff006e', // Neon pink
  '#8338ec', // Neon purple
  '#3a86ff', // Neon blue
];
```

## 🔧 Troubleshooting

### Colors Not Showing?
- Make sure your colors are valid hex codes (e.g., `#ff0000`)
- Check that the colors array is not empty
- Verify the component is imported correctly

### Animation Too Fast/Slow?
- Adjust the `duration` prop (higher = slower)
- Change the `ease` property in the transition

### Performance Issues?
- Reduce the number of colors in your gradient
- Lower the opacity of the gradient
- Use fewer floating elements

## 🚀 Pro Tips

1. **Color Harmony**: Use colors that complement each other
2. **Brand Consistency**: Match your gradient to your brand colors
3. **Accessibility**: Ensure sufficient contrast with text
4. **Performance**: Limit to 5-8 colors for smooth animation
5. **Testing**: Test on different devices and browsers

## 📱 Responsive Considerations

The gradient automatically adapts to different screen sizes. For mobile optimization:

```typescript
<CustomFramerGradient 
  colors={framerColors}
  className="opacity-20 md:opacity-30" // Different opacity for mobile
  duration={8} // Slightly faster on mobile
/>
```

## 🎭 Integration with Other Components

You can use the gradient in other parts of your app:

```typescript
// In any component
import { CustomFramerGradient } from '@/components/CustomFramerGradient';

function MyComponent() {
  return (
    <div className="relative">
      <CustomFramerGradient colors={myColors} />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </div>
  );
}
```

Happy animating! 🎨✨
