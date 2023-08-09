import { createStory, createTemplate } from '../storybook';
import { ControlledComponentsStub } from './.storybook/controlled-components.stub';
import { FormFieldsStub } from './.storybook/form-fields.stub';
import { NestedControlledComponentsStub } from './.storybook/nested-controlled-components.stub';

export default createStory(FormFieldsStub);

export const Default = createTemplate(ControlledComponentsStub).init();

export const FormFields = createTemplate(FormFieldsStub).init();

export const Nested = createTemplate(NestedControlledComponentsStub).init();
