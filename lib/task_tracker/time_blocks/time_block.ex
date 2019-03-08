defmodule TaskTracker.TimeBlocks.TimeBlock do
  use Ecto.Schema
  import Ecto.Changeset


  schema "timeblocks" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    field :task_id, :id

    timestamps()
  end

  @doc false
  def changeset(time_block, attrs) do
    time_block
    |> cast(attrs, [:start, :end])
    |> validate_required([:start, :end])
  end
end
