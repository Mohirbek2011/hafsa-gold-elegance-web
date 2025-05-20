
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  category: string;
  isNew?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageSrc,
  category,
  isNew = false,
  className,
}) => {
  return (
    <div className={cn("group relative flex flex-col hover-lift", className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && (
          <div className="absolute top-2 left-2 bg-gold text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </div>
        )}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex flex-col">
        <Link to={`/catalog/${id}`} className="hover:underline decoration-gold underline-offset-4 decoration-1">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        </Link>
        <p className="text-xs text-gray-500 mt-1">{category}</p>
        <p className="text-sm font-semibold text-gray-900 mt-2">${price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
