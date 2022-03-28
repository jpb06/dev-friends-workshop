# ⚡ Frontend guidelines

<p align="center">
  <img src="./assets/bp.jpg" width="450" alt="bp" />
</p>

## 🔶 Use function components and hooks

Yeah... I know. This sounds pretty uncontroversial now.

### Do not use class components. Write only function components and hooks

#### ❌ Don't

```tsx
class MyComponent extends React.Component {
  // ...
}
```

### Use proper types (`React.FC`). Do not use `JSX.Element`

#### ✅ Do

```tsx
export const MyComponent: React.FC = () => {
  // ...
};
```

#### ❌ Don't

```tsx
export const MyComponent = (): JSX.Element => {
  // ...
};
```

### Use React.FC to define props type and de-structure them asap

#### ✅ Do

```tsx
interface MyComponentProps {
  myProps: string;
  isCool: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  myProps,
  isCool,
}) => {
  // ...
};
```

#### ❌ Don't

```tsx
interface MyComponentProps {}

export const MyComponent = (props: MyComponentProps): JSX.Element => {
  // ...
};
```

### Do not use the return keyword if you do only one instruction in the function

#### ✅ Do

```tsx
export const OneLiner = () => <>Topkek</>;
```

#### ❌ Don't

```tsx
export const OneLiner = () => {
  return <>Topkek</>;
};
```

### 1 file = 1 function component maximum

#### ✅ Do

```tsx
// ./MySubComponent.tsx

interface MySubComponentProps {
  myProps: string;
  isCool: boolean;
}

export const MySubComponent: React.FC<MySubComponentProps> = ({
  myProps,
  isCool,
}) => <>I am a sub component</>;
```

```tsx
// ./MyComponent.tsx

interface MyComponentProps {
  myProps: string;
  isCool: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  myProps,
  isCool,
}) => (
  <>
    <MySubComponent />
  </>
);
```

#### ❌ Don't

```tsx
interface MySubComponentProps {
  myProps: string;
  isCool: boolean;
}

export const MySubComponent: React.FC<MySubComponentProps> = ({
  myProps,
  isCool,
}) => <>I am a sub component </>;

interface MyComponentProps {
  myProps: string;
  isCool: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  myProps,
  isCool,
}) => (
  <>
    <MySubComponent />
  </>
);
```

## 🔶 No logic in components

Components should only contain JSX and some very simple conditional rendering at most. If complex logic is required, it should be defined either in a hook or in a module. If the logic is linked to react (like using a hook such as useEffect or useState), then you must deport the logic to a hook and name it as useXxx. Hooks should be created in a hooks folder as close as possible to where the hook is actually used. Otherwise, you should export that logic to a module in a logic folder.

## 🔶 Prefer types over enums

Types simplify props definition. They also simplify complex renderings implementations using type rendering:

```typescript
type Status = 'loading' | 'success' | 'error';

type OrderSummaryProps = {
  status: Status;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ status }) => (
  <>
    {
      {
        loading: <Loading />,
        Error: <Error />,
        Success: <OrderDetails />,
      }[status]
    }
  </>
);
```

## 🔶 Let's avoid redux if we can

Redux is a great tool but it also makes it harder to get the big picture on a component lifecycle because of its `action → reducers → select` circular workflows.

Another issue is redux doesn't work well with asynchronicity. That's why modules like thunks, observables or sagas exist. This is essentially adding another layer of complexity to patch something that is just not designed to work the way we want it to.

Finally, it's very difficult to arbitrate on where a state should actually reside. This inevitably results in teams putting more and more things in redux store, because "it's simpler". We then get into a situation where redux store has more responsibilities than it should, essentially just making our life harder.
