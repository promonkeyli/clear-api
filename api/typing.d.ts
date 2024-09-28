declare namespace API {
    type Category = {
          id?: number;
          name?: string;
    }
    type Pet = {
          id?: number;
          category?: any;
          name?: string;
          photoUrls?: string[];
          tags?: any[];
          /* pet status in the store */
          status?: string;
    }
    type Tag = {
          id?: number;
          name?: string;
    }
    type ApiResponse = {
          code?: number;
          type?: string;
          message?: string;
    }
    type Order = {
          id?: number;
          petId?: number;
          quantity?: number;
          shipDate?: string;
          /* Order Status */
          status?: string;
          complete?: boolean;
    }
    type User = {
          id?: number;
          username?: string;
          firstName?: string;
          lastName?: string;
          email?: string;
          password?: string;
          phone?: string;
          /* User Status */
          userStatus?: number;
    }
}
