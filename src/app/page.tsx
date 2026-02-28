import NameForm from "@/components/name-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JoinPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-medium text-xl">Tonik | Typing game</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <NameForm />
      </CardContent>
    </Card>
  );
}
