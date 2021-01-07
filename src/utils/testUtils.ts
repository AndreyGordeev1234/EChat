import * as authHooks from 'react-firebase-hooks/auth';
import * as auth from './authContext';
import * as dialogHooks from './useDialogSub';

export const haveOnPage = (wrapper: any, component: any, count: number = 1) => {
  expect(wrapper.find(component)).toHaveLength(count);
};

export const containText = (wrapper: any, component: any, text: string) => {
  expect(wrapper.find(component).text()).toContain(text);
};

export const defaultSpy = () => {
  jest
    .spyOn(authHooks, 'useAuthState')
    .mockReturnValue([undefined, false, undefined]);
  jest.spyOn(auth, 'useAuth').mockReturnValue({} as any);
  jest.spyOn(dialogHooks, 'useDialogSub').mockImplementation(() => {});
};
