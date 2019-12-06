import "intersection-observer";
import React from "react";
import styled from "styled-components";
import WheelPickerItem from "@/components/WheelPickerItem";
import useObsever from "@/hooks/useObserver";

const List = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  display: inline-block;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: center;
  padding: 0 20px;
  ${(props: {
    height: number;
    width: string;
    backgroundColor: string;
    shadowColor: string;
  }): string => `
    height: ${props.height}px;
    width: ${props.width};
    background-color: ${props.backgroundColor};
    box-shadow: 1px 3px 10px ${props.shadowColor} inset;
  `}
`;

const calculateSpaceHeight = (height: number, itemHeight: number): number => {
  const limit = height / itemHeight / 2 - 0.5;
  return itemHeight * limit;
};

const setStyles = (styles: {
  width?: number;
  color?: string;
  activeColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  shadowColor?: string;
}) => {
  const _color = styles.color || "#fff";
  return {
    color: _color,
    activeColor: styles.activeColor || _color,
    fontSize: styles.fontSize || 16,
    backgroundColor: styles.backgroundColor || "#555",
    shadowColor: styles.shadowColor || "#333",
    width: styles.width ? `${styles.width}px` : "100%"
  };
};

export interface PickerData {
  id: string;
  value: string | number;
}

export interface WheelPickerProps {
  data: PickerData[];
  onChange: (target: Element) => void;
  height: number;
  itemHeight: number;
  width?: number;
  color?: string;
  activeColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  shadowColor?: string;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
  data,
  onChange,
  height,
  itemHeight,
  width,
  color,
  activeColor,
  fontSize,
  backgroundColor,
  shadowColor
}) => {
  const { root, refs, activeID } = useObsever(data, onChange);
  const styles = setStyles({
    width,
    color,
    activeColor,
    fontSize,
    backgroundColor,
    shadowColor
  });

  return (
    <List
      ref={root}
      data-testid="picker-list"
      height={height}
      width={styles.width}
      backgroundColor={styles.backgroundColor}
      shadowColor={styles.shadowColor}
    >
      <div style={{ height: calculateSpaceHeight(height, itemHeight) }} />
      {data.map(item => (
        <WheelPickerItem
          key={item.id}
          {...item}
          {...styles}
          height={itemHeight}
          activeID={activeID}
          forwardRef={refs[item.id]}
        />
      ))}
      <div style={{ height: calculateSpaceHeight(height, itemHeight) }} />
    </List>
  );
};

export default WheelPicker;
