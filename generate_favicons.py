from PIL import Image
import os

def generate_favicons(source_path, output_dir):
    print(f"Processing {source_path}...")
    try:
        img = Image.open(source_path)
    except Exception as e:
        print(f"Failed to open image: {e}")
        return

    # Ensure valid alpha channel
    img = img.convert("RGBA")

    # Crop transparency
    bbox = img.getbbox()
    if bbox:
        # Add a tiny bit of padding if needed, but for "max size" we want it tight.
        # Let's add 5% padding if possible, maintaining aspect ratio? 
        # Actually, for favicons, tight crop is usually best for visibility.
        # I will crop tight, then center in a square.
        img_cropped = img.crop(bbox)
        print(f"Cropped from {img.size} to {img_cropped.size}")
    else:
        img_cropped = img
        print("No transparency border found.")

    # Square canvas
    w, h = img_cropped.size
    size = max(w, h)
    
    # Create new square image with transparent background
    square_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = ((size - w) // 2, (size - h) // 2)
    square_img.paste(img_cropped, offset)

    # Resizing strategy: Lanczos for quality
    
    # 1. favicon.ico (16, 32, 48)
    # Pillow can save ICO with sizes
    icon_sizes = [(16, 16), (32, 32), (48, 48)]
    square_img.save(os.path.join(output_dir, "favicon.ico"), sizes=icon_sizes)
    print("Generated favicon.ico")

    # 2. favicon-32x32.png
    f32 = square_img.resize((32, 32), Image.Resampling.LANCZOS)
    f32.save(os.path.join(output_dir, "favicon-32x32.png"))
    print("Generated favicon-32x32.png")

    # 3. favicon-16x16.png
    f16 = square_img.resize((16, 16), Image.Resampling.LANCZOS)
    f16.save(os.path.join(output_dir, "favicon-16x16.png"))
    print("Generated favicon-16x16.png")

    # 4. apple-touch-icon.png (180x180)
    apple = square_img.resize((180, 180), Image.Resampling.LANCZOS)
    apple.save(os.path.join(output_dir, "apple-touch-icon.png"))
    print("Generated apple-touch-icon.png")

    # 5. android-chrome-192x192.png
    android192 = square_img.resize((192, 192), Image.Resampling.LANCZOS)
    android192.save(os.path.join(output_dir, "android-chrome-192x192.png"))
    print("Generated android-chrome-192x192.png")

    # 6. android-chrome-512x512.png
    android512 = square_img.resize((512, 512), Image.Resampling.LANCZOS)
    android512.save(os.path.join(output_dir, "android-chrome-512x512.png"))
    print("Generated android-chrome-512x512.png")

    # 7. Save optimized full logo for app usage
    # We use the cropped version, but let's keep it as high res as possible (original crop)
    square_img.save(os.path.join("src", "assets", "logo-optimized.png"))
    print("Generated src/assets/logo-optimized.png")

if __name__ == "__main__":
    src = os.path.join("public", "logo.png")
    dest = "public"
    generate_favicons(src, dest)
