import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => (
  <article className="rounded-xl border border-god-border bg-god-card p-5">
    <div className="flex gap-1 text-god-gold">
      {Array.from({ length: review.rating }).map((_, index) => <FaStar key={index} />)}
    </div>
    <p className="mt-4 text-sm leading-6 text-gray-200">{review.comment}</p>
    <p className="mt-4 font-bold text-white">{review.name}</p>
  </article>
);

export default ReviewCard;
