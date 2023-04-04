type Data = { title: string; text: string; url: string };

type Args = {
  data: Data;
  onNativeFallback: () => void;
};
const initShare = ({ data, onNativeFallback }: Args) => {
  try {
    if (typeof navigator.canShare === 'function' && navigator.canShare(data)) {
      navigator.share(data);
    } else {
      onNativeFallback();
    }
  } catch (e) {}
};

export default initShare;
