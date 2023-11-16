interface ExampleComponentProps {
  // the props type goes here
  exampleProp: string; // name: type;
  exampleProp2: number; // name: type;
}

// Component name must be the same as the file name (ExampleComponent.tsx)
export default function ExampleComponent(props: ExampleComponentProps) {
  return <div>ExampleComponent</div>;
}
