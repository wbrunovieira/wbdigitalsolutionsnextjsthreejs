#!/bin/bash

echo "🎬 Optimizing remaining videos..."
echo "================================"

cd public/videos

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed. Please install it first:"
    echo "   brew install ffmpeg"
    exit 1
fi

# Videos that need optimization
declare -a videos=("security-website.mp4" "websitehttps.mp4")

for video in "${videos[@]}"; do
    if [ -f "$video" ]; then
        base_name="${video%.mp4}"
        optimized_name="${base_name}_optimized.mp4"
        lowbitrate_name="${base_name}_lowbitrate.mp4"
        
        echo ""
        echo "Processing: $video"
        echo "-------------------"
        
        # Create optimized version (balanced quality/size)
        if [ ! -f "$optimized_name" ]; then
            echo "Creating $optimized_name..."
            ffmpeg -i "$video" -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k -movflags +faststart "$optimized_name" -y 2>/dev/null
            
            if [ -f "$optimized_name" ]; then
                original_size=$(du -h "$video" | cut -f1)
                optimized_size=$(du -h "$optimized_name" | cut -f1)
                echo "✅ Created: $optimized_name ($original_size → $optimized_size)"
            else
                echo "❌ Failed to create $optimized_name"
            fi
        else
            echo "⏭️  $optimized_name already exists"
        fi
        
        # Create low bitrate version (maximum compression)
        if [ ! -f "$lowbitrate_name" ]; then
            echo "Creating $lowbitrate_name..."
            ffmpeg -i "$video" -c:v libx264 -preset veryslow -crf 35 -c:a aac -b:a 96k -vf "scale=854:480" -movflags +faststart "$lowbitrate_name" -y 2>/dev/null
            
            if [ -f "$lowbitrate_name" ]; then
                original_size=$(du -h "$video" | cut -f1)
                lowbitrate_size=$(du -h "$lowbitrate_name" | cut -f1)
                echo "✅ Created: $lowbitrate_name ($original_size → $lowbitrate_size)"
            else
                echo "❌ Failed to create $lowbitrate_name"
            fi
        else
            echo "⏭️  $lowbitrate_name already exists"
        fi
    else
        echo "⚠️  $video not found"
    fi
done

echo ""
echo "================================"
echo "✅ Video optimization complete!"
echo ""
echo "📊 Final sizes:"
ls -lah *.mp4 | grep -E "(security-website|websitehttps)" | awk '{print $5, $9}'