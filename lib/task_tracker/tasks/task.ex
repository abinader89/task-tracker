defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :done, :boolean, default: false
    field :time_spent, :integer
    field :title, :string
    field :assigned, :id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :done, :time_spent])
    |> validate_required([:title, :desc, :done, :time_spent])
  end
end
