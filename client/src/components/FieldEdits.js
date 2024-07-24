import React from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

const FieldEdits = (props) => {
  return (
    <FormControl my={1} display="flex" alignItems="center">
      {props.cellData.leading != null && (
        <InputGroup size="sm">
          <InputLeftAddon
            bg="lightgray"
            borderRadius="full"
            color="gray.600"
            fontWeight="bold"
            px={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="24px"
            height="24px"
          >
            {props.cellData.leading}
          </InputLeftAddon>
          <Input
            type={props.cellData.type}
            placeholder={props.cellData.placeholder}
            min={props.cellData.min}
            name={props.cellData.name}
            id={props.cellData.id}
            value={props.cellData.value}
            step={props.cellData.step}
            precision={props.cellData.precision}
            aria-label={props.cellData.name}
            onChange={props.onItemizedItemEdit}
            required
            textAlign={props.cellData.textAlign}
          />
        </InputGroup>
      )}
      {props.cellData.leading == null && (
        <Input
          type={props.cellData.type}
          placeholder={props.cellData.placeholder}
          min={props.cellData.min}
          name={props.cellData.name}
          id={props.cellData.id}
          value={props.cellData.value}
          step={props.cellData.step}
          precision={props.cellData.precision}
          aria-label={props.cellData.name}
          onChange={props.onItemizedItemEdit}
          required
          textAlign={props.cellData.textAlign}
        />
      )}
    </FormControl>
  );
};

export default FieldEdits;
