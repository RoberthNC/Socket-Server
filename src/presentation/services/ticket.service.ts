import { UUIDAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";

export class TicketService {
  private readonly tickets: Ticket[] = [
    { id: UUIDAdapter.v4(), number: 1, createdAt: new Date(), done: false },
    { id: UUIDAdapter.v4(), number: 2, createdAt: new Date(), done: false },
    { id: UUIDAdapter.v4(), number: 3, createdAt: new Date(), done: false },
    { id: UUIDAdapter.v4(), number: 4, createdAt: new Date(), done: false },
    { id: UUIDAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    { id: UUIDAdapter.v4(), number: 6, createdAt: new Date(), done: false },
  ];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter((ticket) => ticket.handleAtDesk);
  }

  public lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket(): Ticket {
    const ticket: Ticket = {
      id: UUIDAdapter.v4(),
      number: this.lastTicketNumber() + 1,
      createdAt: new Date(),
      done: false,
      handleAt: undefined,
      handleAtDesk: undefined,
    };
    this.tickets.push(ticket);
    //TODO. WS
    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find((t) => !t.handleAtDesk);
    if (!ticket)
      return { status: "error", message: "There is not pending tickets" };
    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();
    //TODO: WS
    return { status: "ok", ticket };
  }

  public onFinishedTicket(id: string) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket)
      return { status: "error", message: "Ticket has not been found" };
    this.tickets.map((t) => {
      if (t.id === id) {
        t.done = true;
      }
      return t;
    });
    return { status: "ok" };
  }
}
