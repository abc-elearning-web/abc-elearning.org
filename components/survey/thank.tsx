export const Thank = ({ setTab }: { setTab: (tab: number) => void }) => {
  return (
    <div className="p-3 mt-4 bg-white rounded-xl">
      <p className="m-0 text-xl leading-[30px] text-gray-800 font-semibold">
        Satisfaction survey
      </p>
      <span className="m-0 text-sm leading-[21px] text-gray-800 block mt-2">
        Thank you for your feedback! Your input is valuable for improving our
        products.
      </span>
      <div
        className="text-sm leading-[21px] mt-2 text-blue-500 underline cursor-pointer"
        onClick={() => {
          setTab(0);
        }}
      >
        Edit your answer
      </div>
    </div>
  );
};
