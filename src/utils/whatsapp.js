const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export const whatsappUrl = (message) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const productMessage = ({ product, selectedSize = 'Not selected', selectedColor = 'Not selected', url }) => {
  const price = product?.discountPrice || product?.price || 0;
  return `Hi! I'm interested in the following product:

Product: ${product.name}
Price: Rs. ${price}
Size: ${selectedSize || 'Not selected'}
Color: ${selectedColor || 'Not selected'}

Link: ${url || window.location.href}

Could you please help me with more details?`;
};

export const genericMessage = () =>
  "Hi! I'm interested in GOD WEAR compression activewear. Could you help me choose the right product?";
