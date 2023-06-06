import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

const ButtonGroup = ({ children, value, setValue, style = {} }) => {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelected(value)
  }, [value])

  return (
    <View style={[tw`flex flex-row`, { ...style }]}>
      {children.map((button, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            setSelected(idx)
            setValue('role', idx ? 'OPERATOR' : 'ADMIN')
          }}
          style={tw`w-1/2 h-full flex justify-center items-center border-r border-black ${
            selected === idx ? 'bg-teal-400' : 'bg-transparent'
          }`}
        >
          {button}
        </TouchableOpacity>
      ))}
    </View>
  )
}
export default ButtonGroup
