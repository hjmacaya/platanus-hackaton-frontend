import Image from "next/image";

const BaseCard = ({ title, text, image, link, isClickable, hasImage }) => {
  const Wrapper = isClickable ? 'a' : 'div';
  const cardClasses = `max-w-sm rounded overflow-hidden shadow-lg ${
    isClickable ? 'hover:shadow-xl transform hover:scale-105 transition duration-300' : ''
  }`;

  return (
    <Wrapper
      href={isClickable ? link : undefined}
      className={cardClasses}
    >
      {hasImage && image && (
        <Image className="w-full" src={image} alt="Card Image" width={100} height={100} />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {text}
        </p>
      </div>
      {!isClickable && (
        <div className="px-6 py-4">
          <a
            href={link}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Learn More
          </a>
        </div>
      )}
    </Wrapper>
  );
};

export { BaseCard };
