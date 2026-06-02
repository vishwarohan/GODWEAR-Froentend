import { FaWhatsapp } from 'react-icons/fa';
import { useLogWhatsAppMutation } from '../redux/api/productApi';
import { productMessage, whatsappUrl } from '../utils/whatsapp';

const WhatsAppButton = ({ product, selectedSize, selectedColor }) => {
  const [logWhatsApp] = useLogWhatsAppMutation();

  const handleClick = async () => {
    try {
      await logWhatsApp({
        productId: product._id,
        productName: product.name,
        size: selectedSize,
        color: selectedColor,
      }).unwrap();
    } catch {
      // Query logging should never block the customer from reaching WhatsApp.
    }
    window.open(whatsappUrl(productMessage({ product, selectedSize, selectedColor })), '_blank', 'noopener,noreferrer');
  };

  return (
    <button type="button" onClick={handleClick} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-god-whatsapp px-5 py-3 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110">
      <FaWhatsapp className="text-xl" />
      Query on WhatsApp
    </button>
  );
};

export default WhatsAppButton;
