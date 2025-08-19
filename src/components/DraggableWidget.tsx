import { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

interface DraggableWidgetProps {
  children: React.ReactNode;
}

const DraggableWidget = ({ children }: DraggableWidgetProps) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return;
    
    setIsDragging(true);
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep widget within viewport bounds
    const maxX = window.innerWidth - 400; // Assuming widget width is ~400px
    const maxY = window.innerHeight - 300; // Assuming widget height is ~300px
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Set initial position to bottom right
  useEffect(() => {
    const setInitialPosition = () => {
      setPosition({
        x: window.innerWidth - 420,
        y: window.innerHeight - 320
      });
    };
    
    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);
    return () => window.removeEventListener('resize', setInitialPosition);
  }, []);

  return (
    <div
      ref={widgetRef}
      className="fixed z-50 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="relative bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden">
        {/* Drag handle */}
        <div
          className="flex items-center justify-center h-8 bg-muted hover:bg-muted/80 transition-colors cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Widget content */}
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DraggableWidget;
