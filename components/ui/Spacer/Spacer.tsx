
interface Props {
  space: number
}

export default function Spacer({ space }: Props) {
  return (
    <div className={`p-${space}`}>
    </div>
  );
}
