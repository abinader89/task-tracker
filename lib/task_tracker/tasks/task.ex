defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :done, :boolean, default: false
    field :time_spent, :integer
    field :title, :string
    belongs_to :user, TaskTracker.Users.User
    has_many :timeblocks, TaskTracker.TimeBlocks.TimeBlock

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc])
    |> validate_required([:title, :desc])
  end

  @doc false
  def changeset(task, attrs, sym) when sym == :assign do
    task
    |> cast(attrs, [:user_id])
    |> validate_required([:user_id])
  end

  @doc false
  def changeset(task, attrs, sym) when sym == :done do
    task
    |> change(%{done: true})
    |> cast(attrs, [:done])
    |> validate_required([:done])
  end
end
