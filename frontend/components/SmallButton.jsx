import { TouchableOpacity, Text } from "react-native";

const SmallButton = ({ content, handlePress, otherStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-[#3366cc] rounded-md w-[30%] justify-center items-center min-h-[50px]`}
    >
      <Text className="text-white font-bold">{content}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;
