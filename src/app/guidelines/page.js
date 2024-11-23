import { UploadPage } from '@/components/UploadPage';
import { GuidelineCard } from '@/components/cards';
export default function GuidelinesPage() {

  const guidelinesMock = [
    {
      title: "Pauta 1",
      text: "Pauta de la Interrogación 1 de Ciencias Naturales",
      link: "/guidelines/1"
    },
    {
      title: "Pauta 2",
      text: "Pauta de la Interrogación 2 de Ciencias Naturales",
      link: "/guidelines/2"
    },
    {
      title: "Pauta 3",
      text: "Pauta del Examen de Ciencias Naturales",
      link: "/guidelines/3"
    },
    {
      title: "Pauta 4",
      text: "Pauta de la Interrogación 1 de Matemáticas",
      link: "/guidelines/4"
    },
    {
      title: "Pauta 5",
      text: "Pauta de la Interrogación 2 de Matemáticas",
      link: "/guidelines/5"
    }
  ]
  return (
    <div>
      <UploadPage apiEndpoint="/api/guidelines" method="POST" />

      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus pautas</h1>
      </div>
      <div className="flex flex-row items-center justify-evenly flex-wrap gap-4">
        {guidelinesMock.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div>
    </div>
  )
}