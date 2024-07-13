export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
	const forge = await import('@/soulstones/forge');
	console.log('id', id)
	console.log('forge.default.stones[0]', forge.default.stones[0])
	const stone = forge.default.stones.find((stone) => {
		// We really just care about the number matching, the string afterwards is bonus
		return stone.id.indexOf(id) === 0
	});

	if (!stone) {
		return <div>no find</div>
	}

	return <div>{stone.name}</div>
}
